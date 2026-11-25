/**
 * Which trials a run spends tokens on. A community run is cheap by default: a
 * cap on agent trials, tasks in a seeded random order, and no guided trials for
 * a task the agent already solves unguided.
 *
 * This module calls no agent itself; the caller passes in `runTrial`.
 */
import crypto from 'crypto';
import type { Mode } from './agents.ts';
import { isSolved, type SolvedUnguided, type TrialRecord } from './results.ts';

export const DEFAULT_MODES: Mode[] = ['unguided', 'skill'];
export const DEFAULT_TRIALS = 5;

/** Removes duplicates and puts unguided first: its result decides whether the guided modes run. */
export function orderModes(modes: Mode[]): Mode[] {
  const unique = [...new Set(modes)];
  return [...unique.filter((m) => m === 'unguided'), ...unique.filter((m) => m !== 'unguided')];
}

export function randomSeed(): number {
  return crypto.randomInt(0, 2 ** 31);
}

/** Fisher-Yates with a mulberry32 generator: the same seed and input give the same order. */
export function seededShuffle<T>(items: readonly T[], seed: number): T[] {
  let state = seed >>> 0;
  const random = () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 2 ** 32;
  };
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export interface PlanSize {
  /** Task and run combinations available. */
  pairs: number;
  modes: Mode[];
  cap: number;
  skipSolved: boolean;
}

function canSkip(modes: Mode[], skipSolved: boolean): boolean {
  return skipSolved && modes.length > 1 && modes.includes('unguided');
}

/** The most agent trials a run can start. With skipping, solved tasks can fill slots a full pair could not. */
export function maxTrials({ pairs, modes, cap, skipSolved }: PlanSize): number {
  if (canSkip(modes, skipSolved)) return Math.min(cap, pairs * modes.length);
  return Math.min(pairs, Math.floor(cap / modes.length)) * modes.length;
}

export interface PlanState {
  trials: TrialRecord[];
  /** Task runs whose guided trials were skipped. */
  solvedUnguided: SolvedUnguided[];
}

export interface PlanOptions {
  /** Task ids, already in the order to run them. */
  taskIds: string[];
  runs: number;
  /** Already ordered with orderModes(). */
  modes: Mode[];
  cap: number;
  skipSolved: boolean;
  runTrial: (task: string, mode: Mode, run: number) => Promise<TrialRecord>;
  /** Called after every trial, so partial results can be saved. */
  onTrial?: (state: PlanState) => void;
}

/**
 * Runs each task paired (every mode, unguided first) until the cap is reached.
 * A pair starts only if all of its trials fit under the cap. Skipped trials do
 * not count. A trial that infrastructure failed (`infraError`) stops the run.
 */
export async function runPlan(o: PlanOptions): Promise<PlanState & { aborted: boolean }> {
  const state: PlanState = { trials: [], solvedUnguided: [] };
  for (let run = 1; run <= o.runs; run++) {
    for (const task of o.taskIds) {
      if (state.trials.length + o.modes.length > o.cap) return { ...state, aborted: false };
      for (const mode of o.modes) {
        const trial = await o.runTrial(task, mode, run);
        state.trials.push(trial);
        const solved = mode === 'unguided' && canSkip(o.modes, o.skipSolved) && isSolved(trial);
        if (solved) state.solvedUnguided.push({ task, run });
        o.onTrial?.(state);
        if (trial.agent.infraError) return { ...state, aborted: true };
        if (solved) break;
      }
    }
  }
  return { ...state, aborted: false };
}
