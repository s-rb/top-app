import {ReviewFormProps} from "./ReviewForm.props";
import styles from './ReviewForm.module.css';
import cn from 'classnames';
import {Rating} from "../Rating/Rating";
import {Input} from "../Input/Input";
import {TextArea} from "../TextArea/TextArea";
import {Button} from "../Button/Button";
import CloseIcon from './close.svg';
import {Controller, useForm} from "react-hook-form";
import {IReviewForm, IReviewSentResponse} from "./ReviewFormInterface";
import axios from "axios";
import {API} from "../../helpers/api";
import {useState} from "react";

export const ReviewForm = ({productId, isOpened, className, ...props}: ReviewFormProps): JSX.Element => {
    const {register, control, handleSubmit, formState: {errors}, reset, clearErrors} = useForm<IReviewForm>();
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string>();

    const onSubmit = async (formData: IReviewForm) => {
        try {
            const {data} = await axios.post<IReviewSentResponse>(API.review.createDemo, {...formData, productId});
            if (data.message) {
                setIsSuccess(true);
                reset();
            } else {
                setError('Что-то пошло не так');
            }

        } catch (e) {
            e && e instanceof Error && setError(e.message);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={cn(styles.reviewForm, className)} {...props}>
                <Input
                    {...register("name", {required: {value: true, message: 'Заполните имя'}})}
                    placeholder="Имя"
                    error={errors.name}
                    tabIndex={isOpened ? 0 : -1}
                    aria-invalid={errors.name ? true : false}
                />
                <Input
                    {...register("title", {required: {value: true, message: 'Заполните заголовок'}})}
                    className={styles.title}
                    placeholder='Заголовок отзыва'
                    error={errors.title}
                    tabIndex={isOpened ? 0 : -1}
                    aria-invalid={!!errors.title}

                />
                <div className={styles.rating}>
                    <span>Оценка:</span>
                    <Controller
                        control={control}
                        rules={{required: {value: true, message: 'Укажите рейтинг'}}}
                        render={({field}) =>
                            <Rating
                                isEditable
                                rating={field.value}
                                ref={field.ref}
                                setRating={field.onChange}
                                error={errors.rating}
                                tabIndex={isOpened ? 0 : -1}
                            />
                        }
                        name='rating'/>
                </div>
                <TextArea
                    {...register('description', {required: {value: true, message: 'Заполните текст отзыва'}})}
                    className={styles.description}
                    placeholder='Текст отзыва'
                    error={errors.description}
                    tabIndex={isOpened ? 0 : -1}
                    aria-label='Текст отзыва'
                    aria-invalid={!!errors.description}
                />
                <div className={styles.submit}>
                    <Button appearance='primary' tabIndex={isOpened ? 0 : -1}
                            onClick={() => clearErrors}>Отправить</Button>
                    <span
                        className={styles.info}>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
                </div>
            </div>
            {isSuccess && <div className={cn(styles.success, styles.panel)} role='alert'>
                <div className={styles.successTitle}>Ваш отзыв отправлен</div>
                <div>Спасибо, ваш отзыв будет опубликован после проверки</div>
                <button className={styles.close}
                        onClick={() => setIsSuccess(false)}
                        aria-label='Закрыть оповещение'
                >
                    <CloseIcon/>
                </button>
            </div>}
            {error && <div className={cn(styles.error, styles.panel)} role='alert'>
                Что-то пошло не так. Попробуйте обновить страницу
                <button className={styles.close} onClick={() => setError(undefined)} aria-label='Закрыть оповещение'>
                    <CloseIcon/>
                </button>
                </div>}
        </form>
    );
};