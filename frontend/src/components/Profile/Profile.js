import React, { useContext, useEffect, useState } from "react";
import ProfilePicture from "./profilepicture/ProfilePicture";
import Identifier from "./Identifer/Identifier";
import About from "./About/About";
import UserPosts from "./UserPosts/UserPosts";
import useFetchWrapper from "../../utils/fetchWrapper";
import userStateContext from "../../states/userStateContext";
import Logout from "./Logout";

export default function Profile() {
  const { user } = useContext(userStateContext);
  const fetchFunction = useFetchWrapper();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  document.title = "User";

  useEffect(() => {
    const getData = async () => {
      const response = await fetchFunction({
        url: "/api/user/detail?q=zubi",
      });

      setData(await response.json());
      setLoading(false);
    };

    getData();
  }, []);
  return !loading ? (
    <>
      <Logout />
      <div className="py-4 lite-white-text">
        <div className="py-3">
          <ProfilePicture pictureSrc={data.avatar} />
          <Identifier name={data.full_name} username={data.username} />
        </div>
        <About city={data.city} area={data.area} />
        <UserPosts />
      </div>
    </>
  ) : (
    <div className="p-4">
      <h4>{"Loading..."}</h4>
    </div>
  );
}
