'use client'
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, Button, Tooltip} from "@nextui-org/react";
import Form from "@/components/form";
import { useSelector } from "react-redux";
import { paySelector } from "@/state/pay/selector";
import { useState } from "react";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const state = useSelector(paySelector)
  return (

    <div className='flex items-center justify-center content-center  h-screen bg-gray-900 flex-col gap-5'>
      
      <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
     
        <div className="flex items-center justify-center content-center ">
          {
            state.pay ?
            
            <p className="text-lg text-zinc-200">Solicitud de pago creado con éxito</p>
            :
            <p className="text-lg text-zinc-200">Solicitud de pago</p>
          }
          
        </div>
      </CardHeader>
      <Divider/>
      <CardBody>
        {state.pay ?
        <div className="flex flex-col gap-5">
            {state.pay.payer_email &&
              <p className="text-md text-zinc-200">También le enviamos la url al email ingresado</p>
            }
            <Tooltip
            isOpen={isOpen}
            content="Copiado con éxito"
            color="primary"
            placement="bottom"
          >
                <Button color="primary" variant="bordered" onClick={()=>navigator.clipboard.writeText(state.pay.checkout_url).then(()=> setIsOpen(true))}>
                Haz click para copiar la url de págo
              </Button>  
          </Tooltip>
      </div>
          :
        <Form />
        }
      </CardBody>
      {
        state.error &&
          <CardFooter>
              <p className="text-lg text-rose-500">Ha ocurrido un error, intente mas tarde</p>
          </CardFooter>
      }
      
    </Card>
    </div>
  )
}
