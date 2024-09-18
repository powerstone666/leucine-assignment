import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react";
function Navbar() {
  return (
    <nav className="h-24 bg-black flex items-center p-4 justify-between">
       <img src="https://cdn.prod.website-files.com/668f87e577741f9b4740a272/66ba77ee131fd589252d7907_Leucine%20Logo%20Mobile.svg"/>
       <div className="">
       <Button  size="icon" className="md:hidden">
       <Menu/>
         </Button>
         </div>
    </nav>
  );
}
export default Navbar;