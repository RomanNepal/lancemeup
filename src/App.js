import logo from "./logo.svg";
import "./App.css";
import {
  Avatar,
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Text,
} from "@chakra-ui/react";
import profile from "./profileinfo.json";
import { Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
function App() {
  const initialValues = localStorage.getItem("profile")
    ? JSON.parse(localStorage.getItem("profile"))
    : profile;
  const [formValue, setFormValue] = useState(
    localStorage.getItem("profile")
      ? JSON.parse(localStorage.getItem("profile"))
      : profile
  );
  const [profileEdit, setProfileEdit] = useState(false);
  const [editable, setEditable] = useState(false);
  const [previewPic, setPreviewPic] = useState("");
  console.log("FormValue is ", formValue);
  // useEffect(() => {
  //   if (!localStorage.getItem("profile"))
  //     localStorage.setItem("profile", JSON.stringify(profile));
  // }, []);

  const handleChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    if (previewPic.length) {
      localStorage.setItem(
        "profile",
        JSON.stringify({ ...formValue, profilepicture: previewPic })
      );
    } else {
      localStorage.setItem("profile", JSON.stringify(formValue));
    }

    setEditable(false);
  };
  return (
    <>
      <Box
        // width={"50%"}
        display={{ base: "block", md: "flex" }}
        alignItems={"center"}
        border={"1px"}
        borderColor={"gray.200"}
        ml={"20"}
        mr={"20"}
        mt={"20"}
        borderRadius={"xl"}
        fontFamily={"Inter"}
      >
        <Box width={{ base: "100%", md: "30%" }} padding={"10"}>
          <Center>
            {previewPic.length ? (
              <Avatar
                size={{ base: "xl", md: "2xl" }}
                src={`/${previewPic}`}
              ></Avatar>
            ) : (
              <Avatar
                size={{ base: "lg", md: "2xl" }}
                src={`/${formValue.profilepicture}`}
              ></Avatar>
            )}
          </Center>
          <Center>
            <Box>
              {!editable ? (
                <>
                  <Text fontWeight={"bold"} fontSize={"3xl"} color={"gray.700"}>
                    Welcome, {formValue.name}
                  </Text>
                  <Center>
                    <Button
                      onClick={() => {
                        setEditable(true);
                      }}
                    >
                      Edit Profile
                    </Button>
                  </Center>
                </>
              ) : (
                <>
                  <br></br>
                  <Center flexDir={"column"}>
                    {profileEdit ? (
                      <Input
                        type={"file"}
                        onChange={(e) => {
                          setPreviewPic(e.target.files[0].name);
                        }}
                      ></Input>
                    ) : (
                      <Button
                        onClick={() => {
                          setProfileEdit(true);
                        }}
                        colorScheme={"red"}
                      >
                        Edit DP
                      </Button>
                    )}
                  </Center>
                </>
              )}
            </Box>
          </Center>
        </Box>
        <Box p={"10"} width={{ base: "100%", md: "70%" }}>
          {editable ? (
            <form onSubmit={handleSubmit}>
              <FormControl isRequired>
                <FormLabel>Full Name</FormLabel>

                <Input
                  type="text"
                  name="name"
                  value={formValue.name}
                  onChange={handleChange}
                ></Input>
              </FormControl>
              <br></br>
              <FormControl isRequired>
                <FormLabel>Bio</FormLabel>

                <Input
                  type="text"
                  name="bio"
                  value={formValue.bio}
                  onChange={handleChange}
                ></Input>
              </FormControl>
              <br></br>
              <FormControl>
                <FormLabel>Address</FormLabel>

                <Input
                  name="address"
                  value={formValue.address}
                  onChange={handleChange}
                ></Input>
              </FormControl>
              <br></br>
              <Box display={"flex"} gap={"2"}>
                <Button
                  type={"submit"}
                  width={{ base: "50%", md: "10%" }}
                  colorScheme="green"
                >
                  Confirm
                </Button>
                <Button
                  width={{ base: "50%", md: "10%" }}
                  onClick={() => {
                    setEditable(false);
                    setFormValue(initialValues);
                  }}
                  colorScheme="red"
                  variant={"outline"}
                >
                  Cancel
                </Button>
              </Box>
            </form>
          ) : (
            <>
              <Text fontWeight={"bold"} fontSize={"xl"}>
                Full Name
              </Text>
              <Box>{formValue.name}</Box>
              <br></br>
              <Text fontWeight={"bold"} fontSize={"xl"}>
                Bio
              </Text>
              <Text>{formValue.bio}</Text>
              <br></br>
              <Text fontWeight={"bold"} fontSize={"xl"}>
                Address
              </Text>
              <Text>{formValue.address}</Text>
            </>
          )}
        </Box>
      </Box>
    </>
  );
}

export default App;
