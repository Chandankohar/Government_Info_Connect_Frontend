import { useRef, useState } from 'react';
import { toast } from 'react-toastify';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Loader2, PenSquare, Upload } from 'lucide-react';
import {  useAuthAdmin } from '../../../hooks';

const EditAdminProfileDialog = () => {
  const { admin, setAdmin, uploadPicture, updateAdmin } = useAuthAdmin();
  const uploadRef = useRef(null);
  const [picture, setPicture] = useState('');
  const [loading, setLoading] = useState(false);
  const [adminData, setadminData] = useState({
    name: admin.name,
    address:admin.address,
    email:admin.email,
    contact:admin.contact,
  });

  const handleImageClick = () => {
    uploadRef.current.click();
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    setPicture(file);
  };

  const handleUserData = (e) => {
    const { name, value } = e.target;
    setadminData({ ...adminData, [name]: value });
  };

  const handleSaveChanges = async () => {
    setLoading(true);
    const { name, address, email,contact } = adminData;

    // Validation
    if (name.trim() === '') {
      setLoading(false);
      return toast.error("Name Can't be empty");
    } else if (email.trim() === '') {
      setLoading(false);
      return toast.error("Email cant be empty");
    }
    else if (address.trim() === '') {
      setLoading(false);
      return toast.error("Address cant be empty");
    }
    else if (contact.trim() === '') {
      setLoading(false);
      return toast.error("Contact cant be empty");
    }

    try {
      // first check if picture has been updated or not
      let pictureUrl = '';
      if (picture) {
        // upload picture and save the image url
        pictureUrl = await uploadPicture(picture);
      }

      const adminDetails = {
        name: adminData.name,
        email: adminData.email,
        address: adminData.address,
        contact: adminData.contact,
        picture: pictureUrl,
      };

      const res = await updateAdmin(adminDetails);
      if (res.success) {
        setAdmin(res.admin);
        setLoading(false);
        return toast.success('Updated successfully!');
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong!');
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-600 ">
          <PenSquare className="mr-2 h-4 w-4" />
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <div className="flex justify-center">
          <div className="relative h-40 w-40 cursor-pointer overflow-hidden rounded-full bg-gray-200">
            <div
              className="absolute flex h-full w-full items-center justify-center bg-gray-200 hover:z-10"
              onClick={handleImageClick}
            >
              <input
                type="file"
                className="hidden"
                ref={uploadRef}
                onChange={handlePictureChange}
              />
              <Upload height={50} width={50} color="#4e4646" />
            </div>

            {/* Display user avatar based on picture state */}
            {picture ? (
              <Avatar className="transition-all ease-in-out hover:z-0 hover:hidden ">
                <AvatarImage src={URL.createObjectURL(picture)} />
              </Avatar>
            ) : (
              <Avatar className="transition-all ease-in-out hover:z-0 hover:hidden ">
                <AvatarImage src={admin.picture} />
              </Avatar>
            )}
          </div>
        </div>

        {/* Update form */}
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              value={adminData.name}
              className="col-span-3"
              onChange={handleUserData}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              value={adminData.email}
              className="col-span-3"
              onChange={handleUserData}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="address" className="text-right">
              Address
            </Label>
            <Input
              id="address"
              name="address"
              value={adminData.address}
              className="col-span-3"
              onChange={handleUserData}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="contact" className="text-right">
              Contact
            </Label>
            <Input
              id="contact"
              name="contact"
              value={adminData.contact}
              className="col-span-3"
              onChange={handleUserData}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            disabled={loading}
            type="submit"
            className="w-full"
            onClick={handleSaveChanges}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditAdminProfileDialog;
