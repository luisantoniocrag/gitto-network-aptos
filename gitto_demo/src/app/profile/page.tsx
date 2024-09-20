import WrapperMobile from "@/app/components/WrapperMobile";

const Home: React.FC<{}> = () => {
  return (
    <WrapperMobile>
      <div className="w-[420px] h-screen grid items-center justify-center content-center">
        <div id="card" className="bg-slate-200 rounded-lg -mt-12">
          <div className="w-full mt-12">
            <img
              className="w-24 h-24 rounded-full mx-auto"
              src="https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp"
              alt="Profile Image"
            />
          </div>

          <div className="px-4">
            <div id="line" className="w-[350px] h-[0.5px] bg-slate-400 mt-8" />

            <div className="grid grid-cols-2 my-4 px-2">
              <span className="text-black font-bold mr-12">Nombre</span>

              <h6 className="text-slate-400 font-bold">Lorena Franco</h6>
            </div>

            <div id="line" className="w-[350px] h-[0.5px] bg-slate-400" />

            <div className="grid grid-cols-2 my-4 px-2">
              <span className="text-black font-bold mr-12">
                Nombre de usuario
              </span>

              <h6 className="text-slate-400 font-bold">@Francov</h6>
            </div>

            <div id="line" className="w-[350px] h-[0.5px] bg-slate-400" />

            <div className="grid grid-cols-2 my-4 px-2">
              <span className="text-black font-bold mr-12">Descripción</span>

              <h6 className="text-slate-400 font-bold">Descripción</h6>
            </div>

            <div id="line" className="w-[350px] h-[0.5px] bg-slate-400" />

            <div className="grid grid-cols-2 my-4 px-2">
              <span className="text-black font-bold mr-12">Enlace</span>

              <h6 className="text-slate-400 font-bold"></h6>
            </div>
          </div>
        </div>
      </div>
    </WrapperMobile>
  );
};

export default Home;
