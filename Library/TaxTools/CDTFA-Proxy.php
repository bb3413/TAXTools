<?php
// Accessing the cdtfa.ca.gov server from the client results in a security error. This
// script executes on the server and passes the information back to the client so there
// is no error.

// Get parameters from the JavaScript fetch request
$address = $_GET['address'];
$city = $_GET['city'];
$zip = $_GET['zip'];

// Construct the CDTFA URL
$url = "https://services.maps.cdtfa.ca.gov/api/taxrate/GetRateByAddress?address=" .
	urlencode($address) . "&city=" . urlencode($city) . "&zip=" . $zip;

// Set headers to allow your JavaScript to read the response
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// Fetch the data from CDTFA and echo it back to your JavaScript code.
echo file_get_contents($url);
?>
