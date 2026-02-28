import { RpcException } from '@nestjs/microservices';
import { ErrorCode } from './error-code.enum';

type RpcErrorOption = {
    code: ErrorCode;
    message: string;
    errors?: string[];
};

export function rpcError(options: RpcErrorOption): never {
    throw new RpcException(options);
}
