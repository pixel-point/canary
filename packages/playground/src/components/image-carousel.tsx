import React, { useState } from 'react'
import { ZOOM_INC_DEC_LEVEL } from '../utils/utils'
import {
  Button,
  Carousel,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@harnessio/canary'

interface ImageCarouselProps {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  setZoomLevel: (value: number) => void
  zoomLevel: number
  imgEvent: string[]
}
// TODO: rewrite this to actually work
const ImageCarousel = (props: ImageCarouselProps) => {
  const { isOpen, setIsOpen, setZoomLevel, zoomLevel, imgEvent } = props
  const [imgTitle] = useState(imgEvent && imgEvent.length > 0 ? imgEvent[0] : '')
  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        setIsOpen(false)
        setZoomLevel(1)
      }}>
      <DialogContent className="max-w-[800px] h-[600px] bg-primary-background border-border">
        <DialogHeader>
          <DialogTitle>
            {imgTitle ? imgTitle.substring(imgTitle.lastIndexOf('/') + 1, imgTitle.length) : 'image'}
          </DialogTitle>
          <DialogDescription>
            <Carousel>
              {imgEvent &&
                imgEvent.map(image => {
                  return (
                    <>
                      <img
                        style={{ transform: `scale(${zoomLevel || 1})`, height: `${window.innerHeight - 200}px` }}
                        src={image}
                      />
                    </>
                  )
                })}
            </Carousel>
            <div>
              <div className="flex">
                <Button
                  variant={'icon'}
                  icon="zoom-in"
                  data-testid="zoomInButton"
                  tooltip={'Zoom in'}
                  onClick={() => {
                    if (Number(zoomLevel.toFixed(1)) < 2) {
                      setZoomLevel(zoomLevel + ZOOM_INC_DEC_LEVEL)
                    }
                  }}
                />

                <Button
                  variation={'icon'}
                  icon="zoom-out"
                  data-testid="zoomOutButton"
                  tooltip={'Zoom out'}
                  onClick={() => {
                    if (Number(zoomLevel.toFixed(1)) > 0.3) {
                      setZoomLevel(zoomLevel - ZOOM_INC_DEC_LEVEL)
                    }
                  }}
                />
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default ImageCarousel
