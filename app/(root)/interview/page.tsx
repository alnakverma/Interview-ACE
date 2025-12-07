import InterviewForm from "@/components/InterviewForm";
import { getCurrentUser } from "@/lib/actions/auth.action";

const Page = async () => {
  const user = await getCurrentUser();

  return (
    <>
      <h3>Schedule an interview</h3>

      <p className="text-sm text-muted-foreground mb-4">
        Fill the form to create a mock interview. After creation you can start
        the interview.
      </p>

      <InterviewForm userId={user?.id} />
    </>
  );
};

export default Page;
