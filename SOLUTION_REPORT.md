Fixes: 
- Active item ID was unselectable. Added UseMemo dependancy.
- UseEffect for filteredItems was an endless cycle, slowing and then crashing the app. Removed unnecessary dependancy.
- Error 304 would crash the selected card page. Fixed the request, added error catcher, rewrote the request logic. Added error boundary just in case.
- While not a mistake, shortened the amount of items shown and added "Show more" button as it would slow my machine.
- Cklicking on "Set Active" would redirect you to the card. I took the button out of <Link>, therefore click would not bubble.
- While in a list, description would leak out of the card. Added "overflow: hidden" to the .list-item__description style.

Proposes: 
- Lazy loading for list, nobody needs thousands of items right away.
- Pagination, back-end based filters and search, not asc-desc sort.
- Make a real table out of this list (Tanstack table for example).
- Add multiselect.
- Mobile variant.
- Add error catching and caching. Nobody wants to lose all progress due to a bug/BE hickup.
- Request logic is to be moved elsewhere. I propose /api/
- Typing needs work, too many <any> casts
