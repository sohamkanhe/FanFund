"use client"
import React, { useEffect, useState, useCallback } from 'react'
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { fetchuser, updateProfile } from '@/actions/useractions'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';
import { useDropzone } from 'react-dropzone';

// This is a sub-component specifically for the image dropzone UI
const ImageDropzone = ({ onFileChange, currentImageUrl, type }) => {
  const [preview, setPreview] = useState(currentImageUrl);

  // This effect ensures that if the currentImageUrl from the database changes, the preview updates.
  useEffect(() => {
    setPreview(currentImageUrl);
  }, [currentImageUrl]);

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];
    if (file) {
      // Pass the actual file object up to the main Dashboard component
      onFileChange(file, type);
      // Create a temporary local URL for the preview image
      setPreview(URL.createObjectURL(file));
    }
  }, [onFileChange, type]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.png', '.gif', '.jpg'] },
    multiple: false,
  });

  return (
    <div {...getRootProps()} className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${isDragActive ? 'border-purple-500 bg-purple-900/20' : 'border-gray-600 hover:border-purple-400'}`}>
      <input {...getInputProps()} />
      {preview ? (
        <img src={preview} alt={`${type} preview`} className="mx-auto h-24 rounded-lg object-cover" />
      ) : (
        <p className="text-gray-400">Drag & drop a {type} image here, or click to select one</p>
      )}
    </div>
  );
};

// This is the main Dashboard component
const Dashboard = () => {
  const { data: session, status } = useSession() // Get the session loading status
  const router = useRouter()
  const [form, setForm] = useState({})
  // State to hold the actual file objects that need to be uploaded
  const [filesToUpload, setFilesToUpload] = useState({
    profile: null,
    cover: null
  });

  // CORRECTED useEffect: This now depends on the session status
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
    if (status === 'authenticated') {
      getData();
    }
  }, [status, router]);

  const getData = async () => {
    if (session?.user?.username) {
      let u = await fetchuser(session.user.username)
      setForm(u)
    }
  }

  // This function is called by the ImageDropzone when a file is dropped
  const handleFileChange = useCallback((file, type) => {
    setFilesToUpload(prevFiles => ({
      ...prevFiles,
      [type]: file
    }));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let updatedForm = { ...form };
    const toastId = toast.loading("Updating profile...");

    // Function to upload a single file to our local server
    const uploadFile = async (file) => {
      const data = new FormData();
      data.append('file', file);
      try {
        let response = await fetch('/api/upload', {
          method: 'POST',
          body: data,
        });
        if (!response.ok) {
          throw new Error(`Upload failed with status: ${response.status}`);
        }
        let res = await response.json();
        return res.filePath;
      } catch (error) {
        toast.error(`Failed to upload ${file.name}`);
        return null;
      }
    };

    // Upload profile picture if a new one was selected
    if (filesToUpload.profile) {
      const profilePicPath = await uploadFile(filesToUpload.profile);
      // THIS IS THE CORRECTED BLOCK
      if (profilePicPath) {
        updatedForm.profilepic = profilePicPath;
      }
    }

    // Upload cover picture if a new one was selected
    if (filesToUpload.cover) {
      const coverPicPath = await uploadFile(filesToUpload.cover);
      if (coverPicPath) {
        updatedForm.coverpic = coverPicPath;
      }
    }

    // Update the profile with the new data
    await updateProfile(new URLSearchParams(updatedForm), session.user.username);
    
    toast.update(toastId, { render: "Profile Updated!", type: "success", isLoading: false, autoClose: 5000, transition: Bounce });
    // Reset the file states after successful submission
    setFilesToUpload({ profile: null, cover: null });
  }

  // Show a loading state while the session is being checked
  if (status === 'loading') {
    return <div className="flex justify-center items-center h-screen text-white">Loading...</div>
  }

  return (
    <>
      <ToastContainer />
      <div className='container mx-auto py-5 px-6'>
        <h1 className='text-center my-5 text-3xl font-bold'>Welcome to your Dashboard</h1>

        <form className="max-w-2xl mx-auto" onSubmit={handleSubmit}>
          {/* Form fields for name, email, etc. */}
          <div className='my-2'>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-white">Name</label>
            <input value={form.name || ""} onChange={handleChange} type="text" name='name' id="name" className="input-field" />
          </div>
          <div className="my-2">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">Email</label>
            <input value={form.email || ""} onChange={handleChange} type="email" name='email' id="email" className="input-field" disabled />
          </div>
          <div className='my-2'>
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-white">Username</label>
            <input value={form.username || ""} onChange={handleChange} type="text" name='username' id="username" className="input-field" />
          </div>

          {/* Drag-and-drop for Profile Picture */}
          <div className="my-4">
            <label className="block mb-2 text-sm font-medium text-white">Profile Picture</label>
            <ImageDropzone onFileChange={handleFileChange} currentImageUrl={form.profilepic} type="profile" />
          </div>

          {/* Drag-and-drop for Cover Picture */}
          <div className="my-4">
            <label className="block mb-2 text-sm font-medium text-white">Cover Picture</label>
            <ImageDropzone onFileChange={handleFileChange} currentImageUrl={form.coverpic} type="cover" />
          </div>
          
          {/* Razorpay fields */}
          <div className="my-2">
            <label htmlFor="razorpayid" className="block mb-2 text-sm font-medium text-white">Razorpay Id</label>
            <input value={form.razorpayid || ""} onChange={handleChange} type="text" name='razorpayid' id="razorpayid" className="input-field" />
          </div>
          <div className="my-2">
            <label htmlFor="razorpaysecret" className="block mb-2 text-sm font-medium text-white">Razorpay Secret</label>
            <input value={form.razorpaysecret || ""} onChange={handleChange} type="text" name='razorpaysecret' id="razorpaysecret" className="input-field" />
          </div>

          <div className="my-6">
            <button type="submit" className="w-full text-white bg-purple-600 hover:bg-purple-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Save</button>
          </div>
        </form>
      </div>
      <style jsx>{`
        .input-field {
          width: 100%;
          padding: 0.5rem;
          border-radius: 0.5rem;
          background-color: #1f2937; /* bg-gray-800 */
          border: 1px solid #4b5563; /* border-gray-600 */
          color: white;
        }
        .input-field:disabled {
          background-color: #374151; /* bg-gray-700 */
          cursor: not-allowed;
        }
      `}</style>
    </>
  )
}

export default Dashboard
