import { useForm } from 'react-hook-form';
import { supabase } from '@/libs/supabaseClient';
import Swal from 'sweetalert2';

export default function AddLocation() {
    const { register, handleSubmit, control, errors } = useForm();

    const onSubmit = async (data) => {
        // Handle form submission to Supabase
        // Show success popup with SweetAlert
        Swal.fire('Success', 'Location added successfully', 'success');
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="p-4">
            {/* Form fields as per your requirements */}
            <div>
                <label>Category</label>
                <select {...register('category')} className="input">
                    <option value="KIB C">KIB C</option>
                    <option value="KIB D">KIB D</option>
                </select>
            </div>
            {/* Other fields */}
            <button type="submit" className="btn">
                Save
            </button>
        </form>
    );
}