import { UserProfile } from "../types/UserProfile";

const UserDetails = ({ data }: { data: UserProfile }) => {
  return (
    <div className="flex items-center py-5 sm:px-8 px-2 rounded-3xl sm:gap-8 gap-2 bg-[#D9D9D9] mt-8 md:w-[80%] w-full mx-auto">
      <div className="rounded-full">
        <img
          src={data.avatar_url}
          className="rounded-full sm:max-w-[220px] max-w-[120px]  border-2 border-[#005CFF]"
          alt="Avatar do Usuário"
        />
      </div>
      <div className="w-full">
        <h2 className="font-main text-[#005CFF] mb-4 text-[20px] font-bold">
          {data.name}
        </h2>
        <p className="font-main text-black sm:w-[80%] w-full sm:text-base text-sm">
          {data.bio}
        </p>
      </div>
    </div>
  );
};

export default UserDetails;
