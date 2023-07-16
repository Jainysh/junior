import { nameRecommendation } from "@/types/nameRecommendation";
import { addRecommendations, getRecommendations } from "../../firebase/service";
import { HandThumbDownIcon, HandThumbUpIcon, HomeIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useState, useEffect, SetStateAction } from "react";

const RecommendationsPage = () => {
  const [name, setName] = useState("");
  const [givenBy, setGivenBy] = useState("");
  const [recommendations, setRecommendations] = useState<
    nameRecommendation[]
  >([]);

  useEffect(() => {
    // Fetch existing recommendations from Firebase
    const fetchRecommendations = async () => {
      // const snapshot = await firebase.database().ref('recommendations').once('value');
      const data = await getRecommendations();
      setRecommendations(data);
    };

    fetchRecommendations();
  }, []);

  const handleInputNameChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setName(event.target.value);
  };

  const handleInputGivenByChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setGivenBy(event.target.value);
  };

  const handleRecommendationSubmit = async (event: {
    preventDefault: () => void;
  }) => {
    event.preventDefault();

    // Check if the name has already been recommended
    const existingName = recommendations.find((rec) => rec.name === name);
    if (existingName) {
      // Increment the number if the name has been recommended multiple times
      const newName = `${name} ${existingName.voteCount + 1}`;
      setName(newName);
    }

   const response =  await addRecommendations(name, givenBy || "")
    console.log("response in ducntion", response)
    // Store the recommendation in Firebase
    // firebase.database().ref('recommendations').push({ name, count: 0 });

    // Update the recommendations state with the new recommendation
    setRecommendations((prevRecommendations) => [
      ...prevRecommendations,
      { name, voteCount: 0, givenBy: '' },
    ]);

    // Clear the input field
    setName("");
    setGivenBy("");
  };

  const handleVote =async  (name: string, type: string) => {
    const updatedRecommendations = recommendations.map((rec) => {
      if (rec.name === name) {
        // Check if the user has already voted for this name
        const hasVoted = localStorage.getItem(name);
        if (hasVoted) {
          return rec; // User has already voted, ignore the vote
        }

        // Increment or decrement the vote count based on the vote type
        const count = type === "upvote" ? rec.voteCount + 1 : rec.voteCount - 1;

        // Store the user's vote in localStorage to prevent multiple votes
        localStorage.setItem(name, "true");

        return { ...rec, count };
      }
      return rec;
    });

    // Update the recommendations state with the updated vote count
    setRecommendations(updatedRecommendations);
  };

  return (
    <div className="container mx-auto px-4">
      <nav className="my-4">
        {/* <button> */}

        <Link href="/">
          <div className="flex">
            <HomeIcon className="w-6 h-6" />{" "}
            <span className="ml-2">Go Back</span>
          </div>
        </Link>
        {/* </button> */}
      </nav>

      <div className="bg-pink-200 p-4 text-pink-800 rounded-xl shadow-xl">
        <h1 className="text-2xl  mb-4">
          Please recommend me a good baby girl name that starts with{" "}
          <span style={{ fontFamily: "sans-serif" }}>A, C </span>or{" "}
          <span style={{ fontFamily: "sans-serif" }}>L</span>
        </h1>

        <form
          onSubmit={handleRecommendationSubmit}
          className="mb-4"
        >
          <label className="">
            {/* <span className="block mb-1">Enter name:</span> */}
            <input
              type="text"
              value={name}
              onChange={handleInputNameChange}
              placeholder="My New Name"
              className="w-full mb-4 border border-gray-300 px-3 py-2 rounded"
            />
          </label>
          <label className="">
            {/* <span className="block mb-1">Enter name:</span> */}
            <input
              type="text"
              value={givenBy}
              onChange={handleInputGivenByChange}
              placeholder="Your Name"
              className="w-full mb-4 border border-gray-300 px-3 py-2 rounded"
            />
          </label>
          <button
            type="submit"
            className="bg-pink-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </form>
      </div>

      <p className="text-xl mt-6 mb-2">Check my existing name recommendations and add your like/dislike</p>
      {recommendations.length === 0 && <p>No recommendations yet.</p>}
      {recommendations.map((rec) => (
        <div key={rec.name} className="flex bg-pink-100 px-4 py-2 mb-1 rounded text-pink-700 items-center justify-between">
          <p>
            {rec.name} - Votes: {rec.voteCount}
          </p>
          <div>
            <button
              onClick={() => handleVote(rec.name, "upvote")}
              className="text-green-500 hover:text-green-600 mr-2"
            >
              <HandThumbUpIcon className="w-6 h-6"/>
            </button>
            <button
              onClick={() => handleVote(rec.name, "downvote")}
              className="text-red-500 hover:text-red-600"
            >
              <HandThumbDownIcon className="w-6 h-6"/>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecommendationsPage;
