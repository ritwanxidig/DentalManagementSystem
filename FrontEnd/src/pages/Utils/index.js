import { update } from "../../ApiServices/CrudeApiCalls";
import toast, { Toaster } from "react-hot-toast";

export const updateAppointmentStatus = (appointmentId, status, Role) => {
  update(`Appointments/ChangeStatus/${appointmentId}`, {
    status: status,
  })
    .then((res) => {
      if (Role && Role === "Admin") {
        toast.success(res);
      }
    })
    .catch((er) => {
      console.log(er);
    });
};
