"use client";
import { useRouter } from "next/navigation";
import { Typography } from "@material-tailwind/react";
import { BsPencilFill } from "react-icons/bs";
import { MdDeleteForever } from "react-icons/md";

const View = ({ candidates, handleDelete }) => {
  const TABLE_HEAD = ["ImageUrl", "Name", "Party", "Action"];
  const router = useRouter();
  const handleUpdate = (id) => {
    router.push(`/candidate/${id}`);
  };
  return (
    <div className="w-full h-full">
      <table className="mt-4 w-full min-w-max table-auto text-left p-8">
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
          {candidates.map(({ id, imageUrl, name, party }, index) => {
            const isLast = index === candidates.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

            return (
              <tr key={`candidate-table-row-${index}`}>
                <td className={classes}>
                  <div className="flex flex-col">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {imageUrl}
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
                    {party}
                  </Typography>
                </td>

                <td className={classes}>
                  <div className="flex flex-col">
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
    </div>
  );
};

export default View;
