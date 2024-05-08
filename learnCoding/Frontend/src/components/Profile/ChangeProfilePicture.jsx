import { useEffect, useRef, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { updateDisplayPicture } from "../../apiServices/apiHandler/SettingsAPI";
import Button from "../common/Button";

export default function ChangeProfilePicture() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(null);

  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log("imageFile", imageFile);
    console.log(file);
    if (file) {
      setImageFile(file);
      previewFile(file);
    }
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleFileUpload = () => {
    console.log("uploading...");
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("image", imageFile);

      // console.log("formdata", formData);
      dispatch(updateDisplayPicture(token, formData)).then(() => {
        setLoading(false);
      });
    } catch (error) {
      console.log("Profile image not updated", error.message);
    }
  };

  useEffect(() => {
    if (imageFile) {
      previewFile(imageFile);
    }
  }, [imageFile, user]);

  return (
    <>
      <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 text-richblack-5">
        <div className="flex items-center gap-x-4">
          <img
            src={previewSource || user?.image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[60px] sm:w-[78px] rounded-full object-cover"
          />

          <div className="space-y-2 sm:space-y-1">
            <p>Change Profile Picture</p>

            <div className="flex flex-row gap-3">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                name="image"
                accept="image/png, image/gif, image/jpeg"
              />

              <Button
                onClick={handleClick}
                disabled={loading}
                btnText="Select"
                className="bg-[white]"
              />

              <Button
                type="submit"
                btnText={loading ? "Uploading..." : "Upload"}
                className="flex gap-x-2 bg-yellow-50 !py-2 !px-3 items-center justify-center"
                onClick={handleFileUpload}
                children={
                  !loading && (
                    <FiUpload className="text-lg text-richblack-900" />
                  )
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
