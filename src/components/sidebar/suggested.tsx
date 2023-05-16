import React, { useEffect, useState } from "react";

import Suggestion from "./suggestion";

function SuggestedList() {
  const [perpage, setPerpage] = useState(5);

  const suggestedList = [
    {
      "fullname": "Susana",
      "username": "susana",
      "verified": false,
    },
    {
      "fullname": "Kipsang Ruto",
      "username": "kipsang",
      "verified": true,
    },
    {
      "fullname": "The Vidshop",
      "username": "vidshop",
      "verified": true,
    }
  ];


  const handleSeeMore = () => {
    if (perpage != 20) {
      setPerpage((prev) => prev + 5);
    } else {
      setPerpage(5);
    }
  };

  useEffect(() => {
    const fetchSuggestedList = async () => {

    };

    fetchSuggestedList();
  }, [perpage]);

  return (
    <Suggestion
      title="Suggested accounts"
      list={suggestedList}
      onClick={handleSeeMore}
      perpage={perpage}
    />
  );
}

export default SuggestedList;
