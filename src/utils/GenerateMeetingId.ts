export const generateMeetingId = () => {
    let meetingId = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 8; i++) {
        meetingId += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return meetingId;
}