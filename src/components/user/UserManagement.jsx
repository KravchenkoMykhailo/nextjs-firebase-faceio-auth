"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

import { MdDeleteForever } from "react-icons/md";
import { Typography } from "@material-tailwind/react";

import { useUsers } from "./hook/useUsers";
import { useAuthentication } from "@/contexts/authentication";

const UserManagement = () => {
  const TABLE_HEAD = ["FaceID", "User Name", "Email", "VoteId", "Action"];
  const { handleDelete, allUsers } = useUsers();
  const { user } = useAuthentication();
  const router = useRouter();

  useEffect(() => {
    if (user == null) {
      router.push("/");
    } else {
      if (user.email != "admin@gmail.com" || user.name != "admin")
        router.push("/");
    }
  }, [user]);

  return (
    <>
      {user && (
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={head}
                  className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                  >
                    {head}{" "}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {allUsers.map(({ id, facialId, name, email, voteId }, index) => {
              const isLast = index === allUsers.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={id}>
                  <td className={classes}>
                    <div className="flex flex-col">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {facialId}
                      </Typography>
                    </div>
                  </td>

                  <td className={classes}>
                    <div className="flex flex-col">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {name}
                      </Typography>
                    </div>
                  </td>

                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {email}
                    </Typography>
                  </td>

                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {voteId}
                    </Typography>
                  </td>

                  <td className={classes}>
                    <div className="flex justify-center flex-col">
                      <button
                        onClick={() => {
                          handleDelete(id);
                        }}
                      >
                        <MdDeleteForever className=" text-3xl text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};

export default UserManagement;
