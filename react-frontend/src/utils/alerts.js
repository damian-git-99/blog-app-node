import Swal from 'sweetalert2';

export const errorMessage = (message) => {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: message,
  });
};

export const successMessage = (message) => {
  Swal.fire({
    icon: 'success',
    title: '',
    text: message,
    showConfirmButton: false,
    timer: 1500
  });
};