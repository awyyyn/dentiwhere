import {useState} from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {DialogClose} from "@radix-ui/react-dialog";
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {useAtom} from "jotai";
import {doctorAtom} from "@/atoms/doctors-atom.ts";
import {updateDoctorStatus} from "@/actions/user.ts";
import {Status} from "@/types/types.ts";
import {useToast} from "@/hooks/use-toast.ts";
import {ImSpinner2} from "react-icons/im";

export const VerifyDialog = () => {
    const [loading, setLoading] = useState(false);
    const [doctor, setDoctor] = useAtom(doctorAtom)
    const [input, setInput]  = useState("")
    const { toast } = useToast()
    const [open, setOpen] = useState(false)

    const handleUpdateStatus = async () => {
        try {
            setLoading(true)
            const updatedUser = await updateDoctorStatus(Number(doctor?.id), Status.verified)

            setDoctor(updatedUser)

            toast({
                title: "Verify Doctor Account",
                description: "Doctor Account has been verified!",
                variant: "default",
                className: "bg-emerald-500 text-white"
            })

            setOpen(false)

        }catch (error){
            console.error(error)
            toast({
                title: "Error verifying account",
                description: "An error occurred while verifying account.",
                variant: "destructive"
            })
        }
        setLoading(false)
    }
    return (
        <Dialog open={open}>
            <Button onClick={() => setOpen(true)} variant="default" className="bg-emerald-500/90 border-transparent hover:bg-emerald-500">Verify Doctor</Button>
            <DialogContent removeClose className=" ">
                <DialogHeader>
                    <DialogTitle className="text-2xl">Verify</DialogTitle>
                    <DialogDescription className="text-gray-800 leading-loose text-lg">
                        Are you sure you want to verify your this doctor?
                    </DialogDescription>
                    <div className='space-y-2'>
                        <p className="text-xs">Type <Badge variant="secondary">confirm</Badge> to continue</p>
                        <Input value={input} onChange={(e) => setInput(e.target.value)} />
                    </div>
                </DialogHeader>
                <DialogFooter>
                    <Button onClick={() => !loading && setOpen(false) } disabled={loading}>Close</Button>
                    <Button
                        disabled={input !== "confirm" || loading}
                        className="flex space-x-2 bg-emerald-600 disabled:bg-emerald-600/50 hover:bg-emerald-600 disabled:hover:bg-emerald-600/50 text-white"
                        onClick={handleUpdateStatus}
                    >
                        {loading ? <>
                            <ImSpinner2 className="animate-spin " size={24} />
                            <p>Updating account status...</p>
                        </> :
                        "Confirm"
                        }
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
