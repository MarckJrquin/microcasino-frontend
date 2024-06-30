import React, {useState, useEffect} from "react";
import {Navigate, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import UserService from "../services/user.service";

const AdminBoard = () => {
  const [content, setContent] = useState("");

  const navigate = useNavigate();

  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {

    if(!isLoggedIn){
      navigate('/login');
    }

    const fetchData = async () => {
      try {
        const response = await UserService.getAdminBoard();
        if (response.status === 200) {
          setContent(response.data);
        } else if (response.status === 403) {
          navigate('/unauthorized');
        } else {
          setContent(response.message);
        }
      } catch (error) {
        setContent("An error occurred while fetching the data.");
      }
    };

    if(isLoggedIn){
      fetchData();
    }
  }, [isLoggedIn]);

  return (
    <>
      <div>
        {content}
      </div>
    </>
  )
};

export default AdminBoard;