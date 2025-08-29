// Get target element
const target = document.getElementById('target');

// Function to detect browser name and version
function getBrowserInfo() {
    const ua = navigator.userAgent;
    let browserName = 'Unknown';
    let fullVersion = 'Unknown';

    if (/Chrome\/([0-9.]+)/.test(ua)) {
        browserName = 'Google Chrome';
        fullVersion = ua.match(/Chrome\/([0-9.]+)/)[1];
    } else if (/Firefox\/([0-9.]+)/.test(ua)) {
        browserName = 'Mozilla Firefox';
        fullVersion = ua.match(/Firefox\/([0-9.]+)/)[1];
    } else if (/Safari\/([0-9.]+)/.test(ua) && /Version\/([0-9.]+)/.test(ua)) {
        browserName = 'Safari';
        fullVersion = ua.match(/Version\/([0-9.]+)/)[1];
    } else if (/Edge\/([0-9.]+)/.test(ua)) {
        browserName = 'Microsoft Edge';
        fullVersion = ua.match(/Edge\/([0-9.]+)/)[1];
    }

    return `${browserName} ${fullVersion}`;
}

// Operating system
const osInfo = navigator.platform;

// Screen width and height
const screenWidth = screen.width;
const screenHeight = screen.height;

// Available screen space
const availWidth = screen.availWidth;
const availHeight = screen.availHeight;

// Current date and time in Finnish
const now = new Date();
const finnishDate = now.toLocaleDateString('fi-FI', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
});
const finnishTime = now.toLocaleTimeString('fi-FI', {
    hour: '2-digit',
    minute: '2-digit'
});

// Create <p> elements
const infoItems = [
    `Selaimen nimi ja versio: ${getBrowserInfo()}`,
    `Käyttöjärjestelmä: ${osInfo}`,
    `Näytön leveys: ${screenWidth}px`,
    `Näytön korkeus: ${screenHeight}px`,
    `Selaimelle käytettävissä oleva tila - leveys: ${availWidth}px`,
    `Selaimelle käytettävissä oleva tila - korkeus: ${availHeight}px`,
    `Päivämäärä: ${finnishDate}`,
    `Aika: ${finnishTime}`
];

infoItems.forEach(text => {
    const p = document.createElement('p');
    p.textContent = text;
    target.appendChild(p);
});
