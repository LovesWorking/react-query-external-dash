import React, { useEffect, useState } from "react";
import useConnectedUsers from "./_hooks/useConnectedUsers";
import { ClientQuery } from "./_types/ClientQuery";
import { User } from "./_types/User";
import DevTools from "./_components/devtools/DevTools";
import Providers from "./providers";

interface Props {
  query: ClientQuery;
  socketURL: string;
}
export default function SessionsList({ query, socketURL }: Props) {
  const [username, setUsername] = useState("");
  const [currentUser, setCurrentUser] = useState<User>();
  const [clientUsers, setClientUsers] = useState<User[]>([]);
  const [showQueries, setShowQueries] = useState(true);
  const { users, isConnected, socket } = useConnectedUsers({
    query,
    socketURL,
  });
  useEffect(() => {
    const foundUser = users.find((user) => user.username === username);
    setCurrentUser(foundUser);
    console.log("currentUser", foundUser);
  }, [setCurrentUser, users, username]);
  useEffect(() => {
    setClientUsers(
      users.filter((user) => user.clientType !== "Server-Dashbord")
    );
  }, [users]);
  return (
    <Providers>
      <div>
        <div className="w-full bg-[#EAECF0] flex ">
          <div className="flex">
            <div className="my-auto ml-2"> User </div>
            <select
              value={username}
              disabled={!clientUsers.length}
              className="p-1 m-1 border-2 border-white  shadow-lg rounded-md mx-3"
              onChange={(e) => {
                setUsername(e.target.value.trim());
              }}
            >
              {clientUsers.length ? (
                <option hidden value="">
                  Select a user
                </option>
              ) : (
                <option hidden value="">
                  No connected users
                </option>
              )}
              {clientUsers.map((user, index) => (
                <>
                  <option key={index} value={user.username.toString()}>
                    {user.username}
                  </option>
                </>
              ))}
            </select>
          </div>
          <p
            className={`ml-auto  ${
              currentUser ? "bg-green-400" : "bg-red-400"
            } p-1 m-2 rounded-md text-sm  mt-auto`}
          >
            {currentUser ? "CONNECTED" : "DISCONNECTED"}
          </p>
        </div>
      </div>
      <div className=" w-full h-full py-2 ">
        <div className="border-[#d0d5dd] border-b-2 py-1 flex   ">
          <div className="mx-2">
            <span className="text-[#475467] font-bold ">TANSTACK</span>
            <p className="bg-custom-gradient font-semibold text-xs flex ">
              <span className="gradient-text -mt-1">React Query v5 </span>
            </p>
          </div>
          <div className="ml-1 my-auto">
            <button
              onClick={() => {
                setShowQueries(true);
              }}
              className={`${
                showQueries === true
                  ? "bg-[#F2F4F7] text-[#344054] hover:bg-[#F0F8FF]"
                  : " bg-[#EAECF0] text-[#909193]"
              }    p-1  border-[1px] border-[#d0d5dd] rounded-bl-[4px] rounded-tl-[4px] text-xs  px-2`}
            >
              Queries
            </button>
            <button
              onClick={() => {
                setShowQueries(false);
              }}
              className={`${
                showQueries === false
                  ? "bg-[#F2F4F7] text-[#344054] hover:bg-[#F0F8FF]"
                  : "bg-[#EAECF0] text-[#909193]"
              }    p-1  border-[1px] border-[#d0d5dd] rounded-br-[4px] rounded-tr-[4px] text-xs px-2`}
            >
              Mutations
            </button>
          </div>
        </div>
        {showQueries ? (
          <DevTools
            allQueries={currentUser?.allQueries}
            socket={socket}
            currentUser={currentUser}
          />
        ) : (
          <h1 className="m-3">Comming soon...</h1>
        )}
      </div>
    </Providers>
  );
}
