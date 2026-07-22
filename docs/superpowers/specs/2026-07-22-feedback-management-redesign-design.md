# Feedback Management Redesign

## Goal

Redesign only the Laravel admin feedback page as a responsive smart inbox. The page must make it faster to find, review, update, resolve, and publish feedback while preserving the existing admin shell, authentication, data model, and update route.

## Scope

The work covers `backend/resources/views/admin/feedback.blade.php`, the feedback-listing behavior in `AdminController`, and focused feature tests. It does not redesign the sidebar, dashboard, public testimonials page, authentication, database schema, or other admin resource pages.

## Page Structure

The page uses the existing dark red admin theme and contains four sections:

1. A header titled **Feedback Management** with a short explanation of the inbox workflow.
2. Four summary cards showing Total, New, Testimonials, and Published counts. Counts describe the complete feedback collection and do not change when filters are active.
3. A GET filter bar containing a text search, type filter, status filter, Apply action, and Reset action. Active filters remain populated after submission.
4. A responsive feedback inbox. Each item has a compact summary and an expandable management form.

## Inbox Items

The collapsed summary shows the sender name and email, message preview, feedback type, received date, current status, rating when present, and publication state for testimonials. Statuses use distinct, accessible text-and-color badges rather than color alone.

Expanding an item reveals the existing management fields:

- Testimonials: program or goal, rating, result, testimonial message, and website visibility.
- Enquiries: the submitted message as read-only content.
- All types: workflow status and private admin notes.

Each item saves independently through the existing `admin.feedback.update` route. No bulk actions, deletion, pagination, or new feedback fields are introduced.

## Filtering and Search

Filtering is server-rendered and uses query parameters so it works without JavaScript and produces shareable URLs.

- `search` performs a case-insensitive partial match against name, email, and message.
- `type` accepts `inquiry` or `testimonial`.
- `status` accepts `new`, `read`, `resolved`, or `published`.
- Unsupported filter values are ignored rather than causing an error.
- Results remain ordered newest first.

The controller passes the filtered collection, unfiltered summary counts, and normalized filters to the view.

## States and Feedback

The existing success flash message remains visible after an update. Laravel validation failures return to the page with the relevant validation messages and old input. The page distinguishes these empty states:

- No feedback exists: invite the administrator to check again after visitors submit messages.
- Filters return no matches: explain that no results match and provide a Reset filters action.

Forms keep CSRF protection and method spoofing. All rendered user content continues to use Blade-escaped output.

## Responsive and Accessible Behavior

Desktop uses dense inbox rows with an expandable detail area. Tablet and mobile stack metadata and actions, preserve full-width form controls, and avoid horizontal scrolling. Native `<details>` and `<summary>` provide keyboard-accessible expansion without a JavaScript dependency. Inputs have explicit labels, filter controls have meaningful names, and focus styles remain visible.

## Testing

Laravel feature tests will verify:

- Authenticated administrators can view the feedback inbox and its summary counts.
- Search matches name, email, and message.
- Type and status filters return only matching records and preserve newest-first ordering.
- Unsupported filters do not break the page.
- Updating status, notes, testimonial fields, rating, and publication state persists valid values.
- Invalid update data is rejected with validation errors.
- An unauthenticated visitor cannot access the page.

Implementation follows test-first development: add a focused failing feature test, confirm the expected failure, implement the smallest change, then rerun the focused and full relevant test suites.

## Acceptance Criteria

The finished page visually matches the existing admin theme, provides accurate unfiltered counts, supports combined search/type/status filtering, lets each item be managed independently, clearly handles success/errors/empty results, and remains usable on mobile. Existing feedback records and public-site behavior remain compatible.
