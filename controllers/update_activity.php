<?php
// Deprecated: update_activity endpoint removed when online/offline feature was retired.
http_response_code(410);
header('Content-Type: application/json; charset=utf-8');
echo json_encode(['success' => false, 'message' => 'update_activity endpoint removed']);
exit();
