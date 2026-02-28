import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { rpcError } from './common/errors/rpc-error';
import { ErrorCode } from './common/errors/error-code.enum';

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        AppModule,
        {
            transport: Transport.TCP,
            options: {
                host: 'localhost',
                port: 8807,
                retryAttempts: 3,
            },
        },
    );

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
            exceptionFactory(errors) {
                rpcError({
                    code: ErrorCode.VALIDATION_ERROR,
                    message: 'Validation error.',
                    errors: errors
                        .map((e) => Object.values(e.constraints!))
                        .flat(),
                });
            },
        }),
    );

    await app.listen();
}
void bootstrap();
