import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { CarouselNext, CarouselPrevious, Carousel, CarouselContent, CarouselItem } from "./ui/carousel"
import Autoplay from 'embla-carousel-autoplay';
import messages from "../Messages.json"
import { Mail } from "lucide-react";

export const Preview = () => {
    return (
        <div className="text-white flex flex-col grow font-sans">
            <div className="w-full h-full flex flex-col items-center justify-center grow">
                <h1 className="text-5xl font-extrabold tracking-tighter py-3">Dive into the World of Anonymous Messages</h1>
                <p className="text-xl font-medium">Ask me Anything - Where your identity remains a secret.</p>
                <div className="py-5">
                    <Carousel
                        plugins={[Autoplay({ delay: 2000 })]}
                        className="w-full max-w-lg md:max-w-xl"
                    >
                        <CarouselContent>
                            {messages.map((message, index) => (
                                <CarouselItem key={index} className="p-4">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>{message.title}</CardTitle>
                                        </CardHeader>
                                        <CardContent className="flex flex-col md:flex-row items-start space-y-2 md:space-y-0 md:space-x-4">
                                            <Mail className="flex-shrink-0" />
                                            <div>
                                                <p>{message.content}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    {message.received}
                                                </p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>

                </div>

            </div>
            <footer className="text-center p-4 md:p-6 text-white">
                © 2023 True Feedback. All rights reserved.
            </footer>
        </div>
    )
}
