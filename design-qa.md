# Account entry design QA

Source: the user-selected Care, Side by Side concept, inspected in this session. The reference image is not included in this repository.
Implementation: browser-rendered desktop sign-in, mobile sign-in and sign-up captured and reviewed in this session. Screenshots remain local review evidence and are not included in the PR.
The reference depicts chat, not an auth screen: this review assesses the requested design-language adaptation, not identical page recreation.

Desktop viewport: 1363 x 936 CSS px; screenshot 1363 x 936 at 1x.
Mobile: 390 x 844 CSS px in a same-origin iframe; screenshot includes desktop surround at 1x. Sign-up uses natural vertical scrolling; guest entry remains reachable. No horizontal clipping observed.

## Findings and comparison history
- Initial logo was a single blue. User identified the missing two-tone detail. Corrected all account and guest wordmarks to blue med / navy ixly. Reopened mobile and desktop after correction.
- Orange submit background darkened for readable white labels.
- Fonts: locally hosted Plus Jakarta Sans; rounded heavy wordmark, navy readable body and labelled inputs.
- Spacing: desktop split with light-blue brand area; mobile collapses to compact header and single-column forms. Natural scrolling for sign-up is intentional.
- Colors: light blue, navy, orange and white follow the selected direction. Two-tone logo restored.
- Assets: existing repo icon sprite reused; no new decorative imagery required. Wordmark is live text. Font license included.
- Copy: authentication and email delivery are explicitly unconnected; no false login, account creation, password reset or clinical reply success claims.

## Browser checks
Sign-in empty validation; sign-up tab and submit validation; sample sign-up inputs and consent; password show/hide; honest form feedback; guest entry; sample message entry; reset navigation and required-email feedback. Account scripts and preview server pass node syntax checks. git diff --check passes. No app console errors observed; browser extension metadata errors excluded.

## Scope and limitations
Frontend preview only. No credentials transmitted or persisted. No account service or real pharmacist messaging. Selected source and auth implementation differ in flow by explicit user request. Existing patient portal pages have not been redesigned.

final result: passed
