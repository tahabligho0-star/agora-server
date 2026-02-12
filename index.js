const express = require('express');
const { RtcTokenBuilder, RtcRole } = require('agora-access-token');

const app = express();
const PORT = process.env.PORT || 3000;

// بياناتك التي نسختها سابقاً من موقع Agora
const APP_ID = "3d03c01c55874c639a0191d5b79f112b";
const APP_CERTIFICATE = "b1dee94e09f148109e32bc13b770d404";

app.get('/getToken', (req, res) => {
    const channelName = req.query.channelName;
    if (!channelName) {
        return res.status(400).json({ 'error': 'channel name is required' });
    }

    const uid = 0; 
    const role = RtcRole.PUBLISHER;
    const expirationTimeInSeconds = 3600;
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

    const token = RtcTokenBuilder.buildTokenWithUid(
        APP_ID, APP_CERTIFICATE, channelName, uid, role, privilegeExpiredTs
    );

    return res.json({ 'token': token });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
