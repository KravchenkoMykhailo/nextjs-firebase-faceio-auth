"use client";
import React, { useState, useEffect } from "react";
import { useCandidate } from "../candidate/hook/useCandidate";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { toast } from "react-toastify";
import { useUsers } from "../user/hook/useUsers";
import { useAuthentication } from "@/contexts/authentication";
import { useRouter } from "next/navigation";

const VotingPage = () => {
  const router = useRouter();
  const [voted, setVoted] = useState(false);
  const [votedCandidate, setVotedCandidate] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const { allCandidates, getVotedCandidate } = useCandidate();
  const { user } = useAuthentication();

  const { handleUpdateVoteId } = useUsers();

  const handleClick = (id) => {
    setSelectedCandidate(allCandidates.find((item, index) => item.id == id));
  };
  const handleVoteClick = (candidatorId) => {
    console.log(user);
    setVoted(true);
    handleUpdateVoteId(user, candidatorId);
    toast.info("You voting successed!");
  };

  useEffect(() => {
    if (!user) {
      router.push("/");
      if (user.votedId != "") {
        const fetchData = async () => {
          const candidate = await getVotedCandidate(user.votedId);
          setVotedCandidate(candidate);
          console.log(candidate);
        };
        fetchData();
      }
    }
  }, [user]);
  useEffect(() => {}, []);

  return user != null ? (
    <div className="flex w-full h-full p-4">
      <div className="flex flex-wrap w-full h-full gap-4">
        {allCandidates.map(({ id, imageUrl, name, party }, index) => {
          return (
            <Card
              sx={{ maxWidth: 300, maxHeight: 400 }}
              key={`candidate-card-${index}`}
              onClick={() => {
                handleClick(id);
              }}
            >
              <CardMedia
                sx={{ width: 300, height: 300 }}
                image={imageUrl}
                title="green iguana"
              />
              <CardContent className="flex flex-col justify-center items-center">
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  className="font-bold"
                >
                  {name}
                </Typography>
                <Typography
                  variant="h6"
                  color="text.secondary"
                  className="font-bold"
                >
                  {party}
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <div className="flex items-center justify-center w-[500px] h-full p-12">
        {votedCandidate != null ? (
          <Card className="flex flex-col items-center" sx={{ maxWidth: 400 }}>
            <CardMedia
              sx={{ width: 400, height: 400, backgroundSize: "auto" }}
              image={votedCandidate.imageUrl}
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h4" component="div">
                {votedCandidate.name}
              </Typography>
              <Typography variant="h5" color="text.secondary">
                {votedCandidate.party}
              </Typography>
            </CardContent>
          </Card>
        ) : selectedCandidate != null ? (
          <Card className="flex flex-col items-center" sx={{ maxWidth: 400 }}>
            <CardMedia
              sx={{ width: 400, height: 400, backgroundSize: "auto" }}
              image={selectedCandidate.imageUrl}
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h4" component="div">
                {selectedCandidate.name}
              </Typography>
              <Typography variant="h5" color="text.secondary">
                {selectedCandidate.party}
              </Typography>
            </CardContent>
            <CardActions>
              {voted == false ? (
                <Button
                  variant="contained"
                  color="secondary"
                  size="medium"
                  sx={{ fontSize: "24px", textTransform: "none" }}
                  onClick={() => handleVoteClick(selectedCandidate.id)}
                >
                  Vote
                </Button>
              ) : (
                <div></div>
              )}
            </CardActions>
          </Card>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  ) : (
    <div></div>
  );
};

export default VotingPage;
