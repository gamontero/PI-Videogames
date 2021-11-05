import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions/index";


export default function Detail(props) {
  const dispatch = useDispatch();

  const { id } = props.match.params;

  useEffect(() => {
    dispatch(getDetail(id));
  }, [id, dispatch]);
  var detail = useSelector((state) => state.detail);

   function handleReset() {
    dispatch(getDetail());
  }

  return (
    <div>
      {detail.length == 0 ? (
        <div>
          <p>...Loading</p>
        </div>
      ) : (
        <>
          <div>
            <Link to="/home" onClick={handleReset}>
               Return Home
            </Link>
          </div>
            
            
              <img src={detail.background_image} alt={detail.name}/>
              <div>
                <p>
                  <strong>Title: </strong> {detail.name}
                </p>

                <p>
                  <strong>Released date:</strong>{" "}
                  {detail.released || detail.releaseDate}
                </p>

                <p>
                  <strong>Platforms: </strong>

                  {detail.id?.length > 7
                    ? detail.platforms?.map((p) => p.name).join(" - ")
                    : detail.platforms?.map((p) => p.platform.name).join(" - ")}
                </p>

                <p>
                  <strong>Genres: </strong>
                  {detail.genres?.map((g) => g.name).join("-")}
                </p>

                <p>
                  <strong>Rating: </strong>
                  {detail.rating}
                </p>

                <p>
                  <strong>Description: </strong>
                  {detail.description_raw || detail.description}
                </p>
              
            
          </div>
        </>
      )}
    </div>
  );
}