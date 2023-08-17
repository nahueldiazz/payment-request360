'use client'
import React, { useMemo, useState } from "react";
import {Button, Checkbox, Input, Spinner} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { format } from 'date-fns';
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "@/state/pay/actions";
import { paySelector } from "@/state/pay/selector";

const schema = yup.object({
    description: yup.string().required(),
    date: yup.date().required(),
    mont: yup.number().required(),
    name: yup.string().required(),
    email: yup.string().email(),
    
  }).required();

const Form = () =>{
    const [valueEmail, setValueEmail] = useState("");
    const [valueDescription, setValueDescription] = useState("");
    const [valueDate, setValueDate] = useState("");
    const [valueMont, setValueMont] = useState("");
    const [valueName, setValueName] = useState("");
    const [isSelected, setIsSelected] = useState(false);
    const dispatch = useDispatch()
    const state = useSelector(paySelector)
    const { register, handleSubmit, watch, formState:{ errors } } = useForm({
        mode: 'all',
        resolver: yupResolver(schema)
        
      });
    const onSubmit = (data:any) => {
        const originalDate = new Date(data?.date);
        const formattedDate = format(originalDate, 'dd-MM-yyyy');
        console.log(data);
        const payload = 
       { payment_request:{
            description: data?.description,
            first_due_date: formattedDate,
            first_total: Number.parseFloat(data.mont),
            payer_name: data.name,
            ...(isSelected ? {payer_email: data.email}: {} )
        }}
        
        fetchData(dispatch,payload)
    }

    return (
        <>
        <form onSubmit={handleSubmit(onSubmit)} className="gap-5 flex flex-col">
            <Input
                value={valueDescription}
                type="text"
                label="Descripcion"
                placeholder="ingrese descripción de pago"
                variant="bordered"
                errorMessage={errors.description && "Debe ingresar valor"}
                onValueChange={setValueDescription}
                className="max-w-xs"
                {...register("description")}
                />
            <Input
                value={valueDate}
                type="date"
                placeholder="dd/mm/aaaa"
                label="Fecha"
                variant="bordered"
                errorMessage={errors.date && "Debe ingresar valor"}
                onValueChange={setValueDate}
                className="max-w-xs"
                {...register("date")}
                />

            <Input
                value={valueMont}
                type="text"
                label="Monto"
                variant="bordered"
                placeholder="ingrese monto"
                errorMessage={errors.mont && "Debe ingresar valor"}
                onValueChange={setValueMont}
                className="max-w-xs"
                {...register("mont")}
                />
            <Input
                value={valueName}
                type="text"
                id="name"
                label="Nombre del pagador"
                variant="bordered"
                placeholder="ingrese nombre del pagador"
                errorMessage={errors.name && "Debe ingresar valor"}
                onValueChange={setValueName}
                className="max-w-xs"
                {...register("name")}
                />

            <Checkbox isSelected={isSelected} onValueChange={()=> setIsSelected(prev => !prev)}>
                    Quiero que me llegue al email
            </Checkbox>

            {isSelected &&
            <Input
                value={valueEmail}
                type="email"
                label="Email"
                placeholder="ingrese email"
                variant="bordered"
                errorMessage={(errors.email || (valueEmail === '' && isSelected)) && "Debe ingresar valor"}
                onValueChange={setValueEmail}
                className="max-w-xs"
                {...register("email")}
                />}

                <Button color="primary" type="submit" isDisabled={(valueEmail === '' && isSelected)} isLoading={state.loading}>
                    Generar pedido de pago
                </Button>

        </form>
        </>
    );
  
}
export default Form


