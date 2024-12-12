import React, { useState, useCallback } from 'react';
import useQuery from '../Api/useQueryHooks';
import { useForm } from "react-hook-form";
import useModal from '../Api/useModal';

const Crud = () => {
  const [formSubmit, setFormSubmit] = useState(false);
  const { data, queryError, queryLoading, createProfile, updateProfile, deleteProfile } = useQuery('/get-api', formSubmit, setFormSubmit);
  const { Modal, closeModal, openModal } = useModal();
  const [edit, setEdit] = useState(false);
  const form = useForm();
  const { register, handleSubmit, formState, reset } = form;
  const { errors } = formState;

  const submit = useCallback((data, e) => {

    if (edit) {
      updateProfile(`/update-profile/${data.id}`, data)
        .then((response) => {
          alert('Profile updated');
          setFormSubmit(prevState => !prevState); 
          closeModal();
        })
        .catch((err) => {
          alert('Failed to update');
        });
        setEdit(false)
      return;
    }

    reset();
    setFormSubmit(prevState => !prevState);  
    createProfile('/register-profile', data)
      .then((response) => {
        alert('Profile created');
        closeModal();
      })
      .catch((err) => {
        alert('Failed to create');
      });


  }, [formSubmit, createProfile, closeModal, edit]);



  const handleDeleteProfile = (data) => {
    deleteProfile(`/delete-profile/${data.id}`)
      .then((response) => {
        alert('Delete successful');
        setFormSubmit(prevState => !prevState); 
      })
      .catch((err) => {
        alert('Failed to delete');
      });
  };



  const handleCloseModal = () => {
    reset();
    closeModal();
  };

  

  const handleEditProfile = (data) => {
    openModal();
    setEdit(true);
    reset({
      id: data.id, 
      first_name: data.first_name,
      last_name: data.last_name,
      age: data.age,
      email: data.email
    });
  };

  return (
    <>
      <div className="table-header">
        <h2 style={{ margin: 0, padding: 0 }}>User list</h2>
        <button onClick={() => openModal()} className="button">Add Users</button>
      </div>
      <div className="table-container">
        <table className="responsive-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.result.map((mapped, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{mapped?.first_name} {mapped?.last_name}</td>
                <td>{mapped?.age}</td>
                <td>{mapped?.email}</td>
                <td className="action-contain">
                  <button className="button" id="edit" onClick={() => handleEditProfile(mapped)}>Edit</button>
                  <button className="button" id="delete" onClick={() => handleDeleteProfile(mapped)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        title={'Add User'}
        content={
          <>
            <form>
              <div className="form-group" id="input-column">
                <div className="input-contain">
                  <label htmlFor="first_name">First Name:</label>
                  <input
                    required=""
                    placeholder="Enter your First name"
                    className="form-control"
                    name="first_name"
                    type="text"
                    {...register("first_name", {
                      required: {
                        value: true,
                        message: "*First Name required",
                      }
                    })}
                  />
                  <p className="errors-message">{errors.first_name?.message}</p>
                </div>

                <div className="input-contain">
                  <label htmlFor="last_name">Last Name:</label>
                  <input
                    required=""
                    placeholder="Enter your Last name"
                    className="form-control"
                    name="last_name"
                    type="text"
                    {...register("last_name", {
                      required: {
                        value: true,
                        message: "*Last Name required",
                      },
                    })}
                  />
                  <p className="errors-message">{errors.last_name?.message}</p>
                </div>
              </div>

              <div className="form-group" id="input-column">
                <div className="input-contain">
                  <label htmlFor="age">Age</label>
                  <input
                    required=""
                    placeholder="Enter your age"
                    className="form-control"
                    name="age"
                    type="text"
                    {...register("age", {
                      required: {
                        value: true,
                        message: "*Age required",
                      },
                    })}
                  />
                  <p className="errors-message">{errors.age?.message}</p>
                </div>

                <div className="input-contain">
                  <label htmlFor="email">E-mail:</label>
                  <input
                    required=""
                    placeholder="Enter your E-mail"
                    className="form-control"
                    name="email"
                    type="text"
                    {...register("email", {
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: "*Input a valid email",
                      },
                      required: {
                        value: true,
                        message: "*Email required",
                      },
                    })}
                  />
                  <p className="errors-message">{errors.email?.message}</p>
                </div>
              </div>

              <div className="forms-button-container">
                <button onClick={handleCloseModal} color="primary" className="button-modal">
                  Cancel
                </button>
                <button color="primary" onClick={handleSubmit(submit)} className="button-modal" id='confirm'>
                  Confirm
                </button>
              </div>
            </form>
          </>
        }
      />
    </>
  );
};

export default Crud;
