function showError(message) {
    new Noty({
        type: 'warning', // Set type to 'error'
        layout: 'topCenter', // Position of the notification
        text: message, // Error message to display
        timeout: 5000, // Notification disappears after 5 seconds
        killer: true, // Only one notification of this type is allowed
        closeWith: ['button'] // Allows closing with a button
    }).show();
}

export{
    showError
}