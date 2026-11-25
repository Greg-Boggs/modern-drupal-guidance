# Expectations

- Each component the task asks for is a directory under the module's or theme's `components/` directory.
- Each component directory contains `<name>.component.yml` and `<name>.twig`, where `<name>` is the directory name.
- No component template uses the `.html.twig` extension.
- Each `<name>.component.yml` has a `name` key.
- Each `<name>.component.yml` defines `props` as a JSON Schema object with a `properties` map, and lists props the template cannot render without under `required`.
- Content that is markup or a render array (body text, images, rendered fields) is defined under `slots` and printed in the template with a Twig `{% block %}` of the same name.
- The component's CSS and JS, if any, are `<name>.css` and `<name>.js` in the component directory.
- No `*.libraries.yml` entry and no `attach_library()` call exists for the component's own CSS or JS.
- The module or theme does not declare a dependency on the `sdc` module.
- Templates that use the component refer to it by its ID `<provider>:<name>`, not by a file path.
- Templates that fill slots use `{% embed '<provider>:<name>' ... only %}`; templates that pass only props use `include()` with `with_context = false` or `{% include ... only %}`.
- PHP code that renders the component uses a render array with `'#type' => 'component'`, `'#component' => '<provider>:<name>'`, and `#props` and `#slots` keys as needed.
- After a cache rebuild, `plugin.manager.sdc` lists the component ID among its definitions.
- The rendered component's root element carries `data-component-id="<provider>:<name>"`.
- Rendering the component attaches the `core/components.<provider>--<name>` library when the component has CSS or JS.
- Rendering the component with the props the task uses raises no component validation error.
- When the task uses variants on core 11.2 or later, the component's YAML defines them under `variants` and the template reads the `variant` variable.
