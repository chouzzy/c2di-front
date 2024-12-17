declare module 'pannellum-react' {
    import * as React from 'react';

    interface PannellumProps {
        width?: string | number;
        height?: string | number;
        image: string;
        pitch?: number;
        yaw?: number;
        hfov?: number;
        autoLoad?: boolean;
        autoRotate?: number;
        hotspots?: any[]; // Ou um tipo mais específico se você usar hotspots
        // Adicione outras props que você usa aqui
    }

    export class Pannellum extends React.Component<PannellumProps> {}
    export const PannellumVideo: React.FC<any>; // Se você usar PannellumVideo
    export namespace Pannellum {
        export class Hotspot extends React.Component<any> {}
    }
}