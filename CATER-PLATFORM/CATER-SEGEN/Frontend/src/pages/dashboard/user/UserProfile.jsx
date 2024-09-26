import React, { useContext } from 'react'
import { AuthContext } from '../../../contexts/AuthProvider'
import { useForm } from 'react-hook-form';

const UserProfile = () => {
    const {updateUserProfile} = useContext(AuthContext);
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm()
      const onSubmit = (data) => {
        const name = data.name;
        const photoURL = data.photoURL;

        updateUserProfile(name, photoURL).then(() => {
            // Profile updated!
            alert("Profile updated successfully")
          }).catch((error) => {
            // An error occurred
            // ...
          });
      }
  return (
    <div>
           <div className="page-header mb-0">
        <div className="container">
          <div className="row mx-auto text-center justify-center">
            <div className="col-12">
              <h2 className="font-extrabold text-6xl text-green">PROFILE </h2>
            </div>
          </div>
        </div>
      </div>
    <div className='h-screen max-w-md mx-auto flex items-center justify-center '>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <label className="label text-white">
            <span className="label-text">Name</span>
          </label>
          <input type="text" {...register("name")} placeholder="Your name" className="input input-bordered text-white" required />
        </div>
        <div className="form-control">
          <label className="label text-white">
            <span className="label-text">Upload Photo</span>
          </label>
          <input type="file" {...register("photoURL")}  className="file-input w-full mt-1 text-white" />
          {/* <input type="text" {...register("photoURL")} placeholder="photo url" className="input input-bordered" required /> */}
        </div>
        <div className="form-control mt-6">
          <input type='submit' value={"Update"} className="btn bg-green text-white"/>
        </div>
      </form>
    </div>
    </div>
    </div>
  )
}

export default UserProfile