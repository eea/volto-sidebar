# volto-sidebar

Enhancements to the default Volto editing experience.

In addition to the general quality of life improvements, it introduces
pluggability for the edit form implementation, depending on the layout (but
could be extended, in the future, to include other conditions, such as content
type, etc).

In order to do this, it overwrites the ``/edit`` default route. Addons such as
volto-mosaic should use the pluggability offered by this package to integrate
its custom editor.

NOTE TODO: probably the package name is not the most appropriate.
