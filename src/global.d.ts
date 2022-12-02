/// <reference types="@sveltejs/kit" />

interface ToastData {
    text: string;
    time: number;
}

interface Window {
    toasts: Writable<ToastData[]>;
}
