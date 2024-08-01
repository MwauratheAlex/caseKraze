'use client'

import HandleComponent from "@/components/HandleComponent"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@radix-ui/react-scroll-area"
import NextImage from 'next/image'
import { Rnd } from 'react-rnd'
import { Label, Radio, RadioGroup } from '@headlessui/react'
import { useState } from "react"
import { COLORS } from "@/validators/option-validator"

interface DesignConfiguratorProps {
  configId: string
  imgUrl: string
  imgDimensions: { width: number, height: number }
}

const DesignConfigurator = ({
  configId,
  imgUrl,
  imgDimensions
}: DesignConfiguratorProps) => {

  const [options, setOptions] = useState<{
    color: (typeof COLORS)[number]
  }>({
    color: COLORS[0],
  });

  return (
    <div className="relative mt-20 grid grid-cols-1 lg:grid-cols-3 mb-20 pb-20">
      <div className="relative h-[37.5rem] overflow-hidden col-span-2 w-full
        max-w-4xl flex items-center justify-center rounded-lg border-2
        border-dashed border-gray-300 p-12 text-center focus:outline-none
        focus:ring-2 focus:ring-primary focus:ring-offset-2">
        <div className="relative w-60 bg-opacity-50 pointer-events-none aspect-[896/1831]">
          <AspectRatio ratio={896 / 1831} className="pointer-events-none relative z-50 aspect-[896/1831] w-full">
            <NextImage
              src="/phone-template.png"
              alt="phone image"
              className="pointer-events-none z-50 select-none"
              fill />
          </AspectRatio>
          <div
            className="absolute z-40 inset-0 left-[3px] top-px right-[3px]
            bottom-px rounded-[32px] shadow-[0_0_0_99999px_rgba(299,231,235,0.6)]"
          />
          <div
            className={cn(
              "absolute inset-0 left-[3px] top-px right-[3px]bottom-px rounded-[32px]",
              `bg-${options.color.tw}`
            )}
          />
        </div>
        <Rnd
          default={{
            x: 150,
            y: 205,
            height: imgDimensions.height / 4,
            width: imgDimensions.width / 4,
          }}
          lockAspectRatio
          resizeHandleComponent={{
            bottomRight: <HandleComponent />,
            bottomLeft: <HandleComponent />,
            topRight: <HandleComponent />,
            topLeft: <HandleComponent />
          }}
          className="absolute z-20 border-[3px] border-primary"
        >
          <div className="relative w-full h-full">
            <NextImage
              src={imgUrl}
              fill
              alt="your image"
              className="pointer-events-none"
            />
          </div>
        </Rnd>
      </div>

      <div className="h-[37.5rem] flex flex-col bg-white">
        <ScrollArea className="relative flex-1 overflow-auto">
          <div
            aria-hidden="true"
            className="absolute z-10 inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white pointer-events-none"
          />
          <div className="px-8 pb-12 pt-8">
            <h2 className="tracking-tight font-bold text-3xl">
              Customize your case
            </h2>

            <div className="w-full h-px bg-zinc-200 my-6" />

            <div className="relative mt-4 h-full flex flex-col justify-between">
              <RadioGroup
                value={options.color}
                onChange={(val) => {
                  setOptions((prev) => ({
                    ...prev,
                    color: val,
                  }));
                }}
              >
                <Label> Color: {options.color.label} </Label>
                <div className="mt-3 flex items-center space-x-3">
                  {COLORS.map((color) => (
                    <Radio
                      key={color.label}
                      value={color}
                      className={({ focus, checked }) => cn("relative -m-0.5 flex cursor-pointer items-center",
                        "justify-center rounded-full p-0.5 active:ring-0 focus:ring-0",
                        "active:outline-none focus:outline-none border-2 border-transparent",
                        {
                          [`border-${color.tw}`]: focus || checked
                        })}
                    >
                      <span className={cn(`bg-${color.tw}`,
                        " h-8 w-8 rounded-full border border-black  border-opacity-10")} />
                    </Radio>
                  ))}
                </div>
              </RadioGroup>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div >
  );
}

export default DesignConfigurator;
