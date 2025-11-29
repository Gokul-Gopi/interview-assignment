import dayjs from "dayjs";

const activity = [
  {
    id: "1",
    name: "Logged in",
    timestamp: "2024-06-01T10:15:00Z",
  },
  {
    id: "2",
    name: "Logged out",
    timestamp: "2024-06-02T12:30:00Z",
  },
  {
    id: "3",
    name: "Updated profile",
    timestamp: "2024-03-20T14:00:00Z",
  },
  {
    id: "4",
    name: "Changed password",
    timestamp: "2024-10-01T15:45:00Z",
  },
  {
    id: "5",
    name: "Deleted account",
    timestamp: "2024-10-10T16:20:00Z",
  },
];

const LastActivity = () => {
  return (
    <div className="flex flex-col gap-2 p-5 font-medium shadow border rounded-lg h-fit">
      <h3 className="text-lg font-semibold text-primary">Last 5 actions</h3>
      <ul className="flex flex-col gap-1">
        {activity.map((act) => (
          <li key={act.id} className="text-primary flex justify-between">
            <span className="font-semibold text-black">{act.name}: </span>{" "}
            {dayjs(act.timestamp).format("DD-MMM-YYYY, dddd")}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LastActivity;
