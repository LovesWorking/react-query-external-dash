import React from "react";
import useConnectedUsers from "./_hooks/useConnectedUsers";
import { ClientQuery } from "./_types/ClientQuery";
interface Props {
  query: ClientQuery;
  socketURL: string;
}
export default function SessionsList({ query, socketURL }: Props) {
  const { users, isConnected } = useConnectedUsers({
    query,
    socketURL,
  });

  return (
    <div className="h-full w-ful rounded-md min-w-[400px] bg-purple-300">
      {/* Header */}
      <div className="w-full bg-[#EAECF0] flex">
        <p className="my-auto"> User # mrAdmin</p>
        <p
          className={`ml-auto mr-auto ${
            isConnected ? "bg-green-400" : "bg-red-400"
          } p-1`}
        >
          {isConnected ? "CONNECTED" : "DISCONNECTED"}
        </p>
      </div>
      {/* Connected users list */}
      {users.map((user, index) => (
        <a href={`/user/${user.username}`} key={index}>
          <button className="p-3 m-3 border-2 border-white">
            <p>
              {user.clientType} {" | "} {user.username}
            </p>{" "}
            <p></p>
          </button>
        </a>
      ))}
    </div>
  );
}
