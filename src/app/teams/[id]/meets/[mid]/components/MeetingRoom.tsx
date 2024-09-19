import {
  CallingState,
  ParticipantView,
  StreamVideoParticipant,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";

const MyParticipantList = (props: {
  participants: StreamVideoParticipant[];
}) => {
  const { participants } = props;
  return (
    <div style={{ display: "flex", flexDirection: "row", gap: "8px" }}>
      {participants.map((participant) => (
        <ParticipantView
          participant={participant}
          key={participant.sessionId}
        />
      ))}
    </div>
  );
};

export const MyFloatingLocalParticipant = (props: {
  participant?: StreamVideoParticipant;
}) => {
  const { participant } = props;
  if (!participant) return null;
  return (
    <div
      style={{
        position: "absolute",
        top: "15px",
        left: "15px",
        width: "240px",
        height: "135px",
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 10px 3px",
        borderRadius: "12px",
      }}
    >
      <ParticipantView participant={participant} />
    </div>
  );
};

const MeetingRoom = () => {
  const {
    useCallCallingState,
    useParticipantCount,
    useLocalParticipant,
    useRemoteParticipants,
    useParticipants,
  } = useCallStateHooks();

  // for more detail about types of CallingState see: https://getstream.io/video/docs/react/ui-cookbook/ringing-call/#incoming-call-panel
  const callingState = useCallCallingState();
  const participantCount = useParticipantCount();
  const localParticipant = useLocalParticipant();
  const remoteParticipants = useRemoteParticipants();

  const participants = useParticipants();

  if (callingState !== CallingState.JOINED) return <>Loading ...</>;

  return (
    <div>
      <span>MeetingRoom {participantCount}</span>
      <MyParticipantList participants={remoteParticipants} />
      <MyFloatingLocalParticipant participant={localParticipant} />
      <span>{participantCount}</span>

      {/* todo: preview the participants before having joined the video call */}
      <div>
        {participants.map((p) => (
          <div key={p.userId}>
            <p>{p.name}</p>
            <p>
              {p.joinedAt ? "Joined at " + p.joinedAt.toString() : "Not joined"}
            </p>

            <p>{p.isSpeaking ? "Speaking" : "Not speaking"}</p>

            <p>
              {p.screenShareStream ? "Screen sharing" : "Not screen sharing"}``
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MeetingRoom;
