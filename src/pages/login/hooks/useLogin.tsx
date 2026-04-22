import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { showApiErrorMessage, showSuccessMessage } from "@/context/lib/helpers/sonner";
import { useAuth } from "@/context/auth-provider";

import { ROUTES } from "@/routes/routes";
const loginSchema = z.object({
  email: z.email("Enter valid email"),
  password: z.string().min(2, "Enter valid Password"),
});

export const useLogin = () => {
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(loginSchema),
  });

  const { login } = useAuth();
  const handleLoginFormSubmit = form.handleSubmit(async (data) => {
    try {
      const res = await login(data);
      showSuccessMessage(res.message);
      navigate(ROUTES.dashboard);
    } catch (e) {
      showApiErrorMessage(e);
    }
  });
  return { form, handleLoginFormSubmit };
};
