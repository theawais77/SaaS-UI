import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-zinc-900 gap-8 p-4">
      <h1 className="text-white text-2xl font-bold">Login please</h1>
      
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>

      <button
        onClick={() => navigate("/auth/login")}
        className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-6 rounded-full transition-colors duration-200"
      >
        Login Here
      </button>
    </div>
  );
}

export default HomePage;