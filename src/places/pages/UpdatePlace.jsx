import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import Card from "../../shared/components/UIElements/Card";
import "./PlaceForm.css";

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire state Building",
    description: "One of the most famous sky scrappers in the world",
    imageUrl:
      "https://fastly.picsum.photos/id/1079/200/200.jpg?hmac=1ufYwVqTHDtGZw0aD-rsTU5gv74qWxm5-k7xQYkSeig",
    address: "20 W 34th St., New York, NY 10001",
    creator: "2",
    location: { lat: 40.7484405, lng: -73.9856644 },
  },
  {
    id: "p2",
    title: "Empire state Building",
    description: "One of the most famous sky scrappers in the world",
    imageUrl:
      "data:image/jpeg;base64,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",
    address: "20 W 34th St., New York, NY 10001",
    creator: "1",
    location: { lat: 40.7484405, lng: -73.9856644 },
  },
];
const UpdatePlace = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const placeId = useParams().placeId;

  const [formState, inputHandler, setFormData] = useForm({
    title: {
      value: "",
      isValid: false,
    },
    description: {
      value: "",
      isValid: false,
    },
  });

  const identifiedPlaces = DUMMY_PLACES.find((p) => p.id === placeId);
  useEffect(() => {
    if (identifiedPlaces) {
      setFormData(
        {
          title: {
            value: identifiedPlaces.title,
            isValid: true,
          },
          description: {
            value: identifiedPlaces.description,
            isValid: true,
          },
        },
        true
      );
    }
    setIsLoading(false);
  }, [setFormData, identifiedPlaces]);

  const placeUpdateSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  if (!identifiedPlaces) {
    return (
      <div className="center">
        <Card>
          <h2>Couldnot find place!</h2>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="center">
        <h2>Loading..</h2>
      </div>
    );
  }

  return (
    <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title"
        onInput={inputHandler}
        initialValue={formState.inputs.title.value}
        initialValid={formState.inputs.title.isValid}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (min. 5 characters)"
        onInput={inputHandler}
        initialValue={formState.inputs.description.value}
        initialValid={formState.inputs.description.isValid}
      />
      <Button
        type="submit"
        disabled={!formState.isValid}
        children="UPDATE PLACE"
      />
    </form>
  );
};

export default UpdatePlace;
