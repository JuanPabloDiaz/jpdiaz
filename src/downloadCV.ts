// download CV
export function download(): void {
	console.log('Download function called');

	// Create a new anchor element
	const a = document.createElement('a');

	// Set the href and download attributes for the anchor element
	a.href = './assets/pdf/2023-FrontEnd-CV.pdf';
	a.download = '2023-FrontEnd-CV';

	// Append the anchor element to the body
	document.body.appendChild(a);

	console.log('Download link created and appended to body');

	// Trigger the download by simulating click
	a.click();

	console.log('Download link clicked');

	// Remove the anchor element from the body
	document.body.removeChild(a);

	console.log('Download link removed from body');
}
