# volto-sidebar

Enhancements to the default Volto editing experience.

In addition to the general quality of life improvements, it introduces
pluggability for the edit form implementation, depending on the layout (but
could be extended, in the future, to include other conditions, such as content
type, etc).

In order to do this, it overwrites the ``/edit`` and ``/add`` default routes. Addons such as
volto-mosaic should use the pluggability offered by this package to integrate
custom forms editors.

NOTE: The focus of this package was to improve UX for the Volto sidebar by moving some of the editing UI to the main area. So, even though the naming is weird for the actual package contents, it's somewhat appropriate.
