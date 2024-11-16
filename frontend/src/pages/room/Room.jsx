import React, { useEffect } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Room() {
  const { roomID } = useParams();

  useEffect(() => {
    const myMeeting = async (element) => {
      const appID = 1719434705;
      const serverSecret = "d99bee964f6f6b8b27e9ee17efab41b9";
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomID,
        Date.now().toString(),
        "patient"
      );

      const zp = ZegoUIKitPrebuilt.create(kitToken);

      zp.joinRoom({
        container: element,
        sharedLinks: [
          {
            name: 'Share link',
            // Update the URL with the correct path
            url: `http://localhost:3000/Health-Plus/room/${roomID}`,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall,
        },
      });
    };

    // Create and join the room
    const roomContainer = document.getElementById('room-container');
    myMeeting(roomContainer);

    // Send the meeting link via email
    sendMeetingLinkByEmail(roomID);
  }, [roomID]);

  const sendMeetingLinkByEmail = async (roomID) => {
    try {
      await axios.post('http://localhost:8000/api/send-email', {
        email: 'leena.h.mhatre@gmail.com', // Replace with the user's email address
        subject: 'Meeting Link',
        message: `Here is the meeting link: http://localhost:3000/Health-Plus/room/${roomID}`,
      });

      console.log('Meeting link sent via email.');
    } catch (error) {
      console.error('Error sending meeting link via email:', error);
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center  bg-gray-100">
      <div id="room-container">Room</div>
    </div>
  );
}

export default Room;
